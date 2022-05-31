import { DynamoDbConnector } from "../src/db/dynamodb.connector";
import { DbConnectorFilterOperator } from "../src/db/interfaces/db.connector";
import { BaseEntity } from "../src/models/entities/base.entity";

describe('DynamoDB connector tests', () => {
    let dynamoDbConnector: DynamoDbConnector<TestEntity>;

    beforeEach(() => {
        dynamoDbConnector = new DynamoDbConnector('test-table', 'http://localhost:4566', 'eu-central-1', 'accessKeyId', 'secretAccessKey');
    });

    it('Should persist to DynamoDB', async () => {
        
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);
    });

    it('Should update an existing item', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);

        testEntity.name = 'updated-name';

        await dynamoDbConnector.update(testEntity);
    });

    it('Should upsert an existing item', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.upsert(testEntity);
    });

    it('Should delete an existing item', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);

        await dynamoDbConnector.delete(testEntity);
    });

    it('Should get an existing item', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);

        const result = await dynamoDbConnector.getSingle<TestEntity>([{ key: 'id', value: testEntity.id, operator: DbConnectorFilterOperator.EQUALS }]);
        expect(result).toBeDefined();
        expect(result!.id).toBe(testEntity.id);
    });

    it('Should get all existing items', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);

        const result = await dynamoDbConnector.getAll<TestEntity>();
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(1);
    });

    it('Should get all existing items with filters', async () => {
        const testEntity: TestEntity = {
            id: Math.random().toString(16).slice(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: 'test-name',
        }

        await dynamoDbConnector.insert(testEntity);

        const result = await dynamoDbConnector.get<TestEntity>([{
            key: 'name',
            operator: DbConnectorFilterOperator.EQUALS,
            value: 'test-name'
        }]);
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(1);
    });
});

interface TestEntity extends BaseEntity {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}