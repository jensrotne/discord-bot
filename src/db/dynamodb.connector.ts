import { DynamoDB, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { BaseEntity } from "../models/entities/base.entity";
import { DbConnector, DbConnectorFilter, DbConnectorFilterOperator } from "./interfaces/db.connector";

export class DynamoDbConnector<T extends BaseEntity> implements DbConnector<T> {

    private tableName: string; 
    private documentClient: DynamoDBDocumentClient;
    private dynamoDbClient: DynamoDBClient;

    constructor(tableName: string, endpoint?: string, region?: string, accessKeyId?: string, secretAccessKey?: string) {
        this.tableName = tableName;

        const translateOptions = {
            marshallOptions: {
                convertEmptyValues: true,
                removeEmptyValues: true
            },
            unmarshallOptions: {
                wrapNumbers: false
            }
        };

        this.dynamoDbClient = new DynamoDBClient({
            endpoint: endpoint ?? undefined,
            region: region ?? undefined,
            credentials: accessKeyId && secretAccessKey ? {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey
            } : undefined,
        });

        this.documentClient = DynamoDBDocumentClient.from(this.dynamoDbClient, translateOptions);
    }

    async getSingle<T>(filters: DbConnectorFilter[]): Promise<T | undefined> {
        const scanCommand: ScanCommand = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: this.buildFilterExpression(filters),
            ExpressionAttributeNames: this.buildExpressionAttributeNames(filters),
            ExpressionAttributeValues: this.buildExpressionAttributeValues(filters)
        });

        const result = await this.documentClient.send(scanCommand);

        if (!result || !result.Items || result.Items?.length === 0) {
            return undefined;
        };

        return result.Items[0] as T;
    }

    async getAll<T>(): Promise<T[]> {
        const scanCommand: ScanCommand = new ScanCommand({
            TableName: this.tableName
        });

        const result = await this.documentClient.send(scanCommand);

        if (!result || !result.Items || result.Items?.length === 0) {
            return [];
        }

        return result.Items as T[];
    }

    async get<T>(filters: DbConnectorFilter[]): Promise<T[]> {
        const scanCommand: ScanCommand = new ScanCommand({
            TableName: this.tableName,
            FilterExpression: this.buildFilterExpression(filters),
            ExpressionAttributeNames: this.buildExpressionAttributeNames(filters),
            ExpressionAttributeValues: this.buildExpressionAttributeValues(filters)
        });

        const result = await this.documentClient.send(scanCommand);

        if (!result || !result.Items || result.Items?.length === 0) {
            return [];
        }

        return result.Items as T[];
    }

    async insert(item: T): Promise<void> {
        const putCommand: PutCommand = new PutCommand({
            TableName: this.tableName,
            Item: item
        });

        await this.documentClient.send(putCommand);
    }

    async update(item: T): Promise<void> {
        await this.insert(item);
    }

    async upsert(item: T): Promise<void> {
        await this.insert(item);
    }

    async delete(item: T): Promise<void> {
        const baseEntityItem = item as BaseEntity;

        const deleteCommand: DeleteCommand = new DeleteCommand({
            TableName: this.tableName,
            Key: {
                id: baseEntityItem.id,
                createdAt: baseEntityItem.createdAt
            }
        });

        await this.documentClient.send(deleteCommand);
    }

    getTableName(): string {
        return this.tableName;
    }

    private buildFilterExpression(filters?: DbConnectorFilter[]): string {
        if (!filters) {
            return "";
        }

        const filterExpressions: string[] = [];
        for (const filter of filters) {
            filterExpressions.push(this.buildFilterExpressionForOperator(filter));
        }

        return filterExpressions.join(" AND ");
    }

    private buildFilterExpressionForOperator(filter: DbConnectorFilter): string {
        const filterExpression = `#${filter.key} ${this.mapFilterOperatorToDynamoDbOperator(filter.operator)} :${filter.key}`;
        return filterExpression;
    }

    private buildExpressionAttributeNames(filters?: DbConnectorFilter[]): any {
        if (!filters) {
            return {};

        }
        const expressionAttributeNames: any = {};
        for (const filter of filters) {
            expressionAttributeNames[`#${filter.key}`] = filter.key;
        }

        return expressionAttributeNames;
    }


    private buildExpressionAttributeValues(filters?: DbConnectorFilter[]): any {
        if (!filters) {
            return {};
        }

        const expressionAttributeValues: any = {};
        for (const filter of filters) {
            expressionAttributeValues[`:${filter.key}`] = filter.value;
        }

        return expressionAttributeValues;
    }

    private mapFilterOperatorToDynamoDbOperator(operator: DbConnectorFilterOperator): string {
        switch (operator) {
            case DbConnectorFilterOperator.EQUALS:
                return "=";
            case DbConnectorFilterOperator.GREATER_THAN:
                return ">";
            case DbConnectorFilterOperator.GREATER_THAN_OR_EQUALS:
                return ">=";
            case DbConnectorFilterOperator.LESS_THAN:
                return "<";
            case DbConnectorFilterOperator.LESS_THAN_OR_EQUALS:
                return "<=";
            case DbConnectorFilterOperator.NOT_EQUALS:
                return "!=";
            default:
                throw new Error("Invalid filter operator");
        }
    }

}