export enum objectType {
    None,
    Table,
    Area
}
export enum connectionType {
    ONE_TO_ONE,
    ONE_TO_MANY,
    MANY_TO_MANY
}
export enum dataType {
    CHAR = 'CHAR',
    INT = 'INT',
    TINYINT = 'TINYINT',
    BIGINT = 'BIGINT ',
    REAL = 'REAL',
    BOOL = 'BOOL',
    DECIMAL = 'DECIMAL',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    VARCHAR = 'VARCHAR',
    TEXT = 'TEXT',
    ENUM = 'ENUM',
    SET = 'SET',
    DATE = 'DATE',
    TIME = 'TIME',
    DATATIME = 'DATATIME',
    TIMESTAMP = 'TIMESTAMP',
    BLOB = 'BLOB',
    JSON = 'JSON',
}

export enum saveType {
    NONE,
    SAVING,
    SAVED
}

export enum canvasActionType {
    DELETE,
    ADD,
    ADDFIELD,
    REMOVEFIELD,
    UPDATE,
    MOVE,
    PANMOVE,
}