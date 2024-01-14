import { DynamicModule, Module } from '@nestjs/common';
import { PostgresModule } from './postgreSQL/postgresModule';
import { Implementation } from './enum';

@Module({})
export class ImplementationModule {
  static register(implementation: Implementation): DynamicModule {
    let implementedModule;

    switch (implementation) {
      case Implementation.postgre: {
        implementedModule = PostgresModule.register();
      }
    }

    return {
      module: ImplementationModule,
      imports: [implementedModule],
      exports: [implementedModule],
    };
  }
}
