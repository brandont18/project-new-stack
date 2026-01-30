package com.mys.api.multitenancy.provider;

import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.hibernate.service.UnknownUnwrapTypeException;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class MultiTenantConnectionProviderImpl implements MultiTenantConnectionProvider<String> {

    private final DataSource dataSource;

    public MultiTenantConnectionProviderImpl(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Connection getAnyConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }

    @Override
    public Connection getConnection(String tenantIdentifier) throws SQLException {
        final Connection connection = getAnyConnection();
        String schemaName;
        
        if (tenantIdentifier == null || tenantIdentifier.isEmpty() || "public".equalsIgnoreCase(tenantIdentifier)) {
            schemaName = "public";
        } else if (tenantIdentifier.startsWith("tenant_")) {
            schemaName = tenantIdentifier;
        } else {
            schemaName = "tenant_" + tenantIdentifier;
        }
        
        try (Statement statement = connection.createStatement()) {
            statement.execute("SET search_path TO " + schemaName + ", public");
        } catch (SQLException e) {
            throw new SQLException("No se puede modificar la conexión JDBC para utilizar el esquema [" + schemaName + "]", e);
        }
        return connection;
    }

    @Override
    public void releaseConnection(String tenantIdentifier, Connection connection) throws SQLException {
        try (Statement statement = connection.createStatement()) {
            statement.execute("SET search_path TO public");
        } catch (SQLException e) {
            throw new SQLException("No se puede modificar la conexión JDBC para utilizar el esquema [public]", e);
        }
        connection.close();
    }

    @Override
    public boolean supportsAggressiveRelease() {
        return false;
    }

    @Override
    public boolean isUnwrappableAs(Class<?> unwrapType) {
        return MultiTenantConnectionProvider.class.isAssignableFrom(unwrapType);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> T unwrap(Class<T> unwrapType) {
        if (MultiTenantConnectionProvider.class.isAssignableFrom(unwrapType)) {
            return (T) this;
        } else {
            throw new UnknownUnwrapTypeException(unwrapType);
        }
    }
}
