package com.mys.api.multitenancy.service;

import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Service
@Slf4j
@RequiredArgsConstructor
public class TenantMigrationService {

    private final DataSource dataSource;

    public void createTenantSchema(String tenantNit) {
        String schemaName = "tenant_" + tenantNit;
        try (Connection connection = dataSource.getConnection();
            Statement statement = connection.createStatement()) {
            statement.execute("CREATE SCHEMA IF NOT EXISTS " + schemaName);
            runLiquibase(connection, schemaName);

        } catch (Exception e) {
            throw new RuntimeException("Error al crear el esquema para el tenant: " + schemaName, e);
        }
    }

    private void runLiquibase(Connection connection, String schemaName) {
        try (Statement statement = connection.createStatement()) {
            statement.execute("SET search_path TO " + schemaName);
        } catch (Exception e) {
            throw new RuntimeException("Error al cambiar el search_path para el esquema: " + schemaName, e);
        }

        try {
            Database database = DatabaseFactory.getInstance()
                    .findCorrectDatabaseImplementation(new JdbcConnection(connection));
            database.setDefaultSchemaName(schemaName);

            try (Liquibase liquibase = new Liquibase("db/changelog/db.changelog-tenant.yaml",
                    new ClassLoaderResourceAccessor(), database)) {
                liquibase.update("");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al ejecutar las migraciones Liquibase para el esquema: " + schemaName, e);
        }
    }
}
