import { BaseEntity } from "../../models/entities/base.entity";

export interface DbConnector<T extends BaseEntity> {

    getSingle<T>(filters: DbConnectorFilter[]): Promise<T | undefined>;

    getAll<T>(): Promise<T[]>;

    get<T>(filters: DbConnectorFilter[]): Promise<T[]>;

    insert(item: T): Promise<void>;

    update(item: T): Promise<void>;

    upsert(item: T): Promise<void>;

    delete(item: T): Promise<void>;

    getTableName(): string;

}

export interface DbConnectorFilter {
    key: string;
    operator: DbConnectorFilterOperator;
    value: string | number | boolean | Date | null | undefined | Array<string | number | boolean | Date>;
}

export enum DbConnectorFilterOperator {
    EQUALS = "equals",
    NOT_EQUALS = "notEquals",
    GREATER_THAN = "greaterThan",
    LESS_THAN = "lessThan",
    GREATER_THAN_OR_EQUALS = "greaterThanOrEquals",
    LESS_THAN_OR_EQUALS = "lessThanOrEquals",
    IN = "in",
    NOT_IN = "notIn"
}