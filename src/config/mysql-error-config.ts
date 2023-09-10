export const mysqlError = {
  ER_DUP_ENTRY:
    'Duplicate entry error. A record with the same unique key already exists.',
  ER_ACCESS_DENIED_ERROR:
    'Access denied error. User does not have sufficient privileges.',
  ER_NO_SUCH_TABLE:
    'Table not found error. The specified table does not exist.',
  ER_PARSE_ERROR: 'Parse error in SQL query. The query syntax is incorrect.',
  ER_BAD_FIELD_ERROR:
    'Bad field error. The specified field does not exist in the table.',
  ER_TOO_MANY_CONNECTIONS:
    'Too many connections error. The server has reached the maximum allowed connections.',
  ER_LOCK_WAIT_TIMEOUT:
    'Lock wait timeout exceeded error. A transaction cannot obtain a lock within the specified time.',
  ER_TABLE_EXISTS_ERROR:
    'Table exists error. A table with the same name already exists.',
  ER_NOT_SUPPORTED_AUTH_MODE:
    'Unsupported authentication method error. The server does not support the client authentication method.',
  ER_UNKNOWN_ERROR: 'Unknown error. An unexpected error occurred.',
  ER_DATA_TOO_LONG:
    'Data too long for column error. The data exceeds the maximum length allowed for the column.',
  ER_CANNOT_DELETE:
    'Cannot delete or update a parent row error. A record has dependent records in another table with a foreign key constraint.',
  ER_FOREIGN_KEY_CONSTRAINT:
    'Foreign key constraint violation error. The value being inserted or updated violates a foreign key constraint.',
  ER_TRUNCATED_WRONG_VALUE:
    'Truncated wrong value error. Data was truncated when inserting into the column.',
  ER_ILLEGAL_REFERENCE:
    'Illegal reference error. The table or column reference is not allowed in the current context.',
  ER_SUBQUERY_NO_1_ROW:
    'Subquery returns more than one row error. A subquery used where only a single result is expected returns multiple rows.',
  ER_TABLE_NOT_LOCKED_FOR_WRITE:
    'Table not locked for write error. Trying to update or delete data from a table without an appropriate lock.',
};
