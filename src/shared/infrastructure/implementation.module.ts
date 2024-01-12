import { DynamicModule, Module } from '@nestjs/common';
import { PostgreModule } from './postgreSQL/postgre.module';
import { Implementation } from './enum';

@Module({})
export class ImplementationModule {
  static register(implementation: Implementation): DynamicModule {
    let implementedModule;

    switch (implementation) {
      case Implementation.postgre: {
        implementedModule = PostgreModule.register();
      }
    }

    return {
      module: ImplementationModule,
      imports: [implementedModule],
      exports: [implementedModule],
    };
  }
}
