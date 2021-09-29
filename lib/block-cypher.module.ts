import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BlockCypherService } from './block-cypher.service';
import { BLOCK_CYPHER_MODULE_OPTIONS } from './block-cypher.constants';
import type {
  BlockCypherModuleOptions,
  BlockCypherModuleAsyncOptions,
  BlockCypherOptionsFactory,
} from './interfaces';

@Module({
  providers: [
    {
      provide: BlockCypherService,
      useFactory: (options: BlockCypherModuleOptions) =>
        new BlockCypherService(options),
      inject: [BLOCK_CYPHER_MODULE_OPTIONS],
    },
  ],
  exports: [BlockCypherService],
})
export class BlockCypherModule {
  static register(options: BlockCypherModuleOptions): DynamicModule {
    return {
      module: BlockCypherModule,
      providers: [
        {
          provide: BLOCK_CYPHER_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static registerAsync(options: BlockCypherModuleAsyncOptions): DynamicModule {
    return {
      module: BlockCypherModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  static createAsyncProviders(
    options: BlockCypherModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  static createAsyncOptionsProvider(
    options: BlockCypherModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: BLOCK_CYPHER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: BLOCK_CYPHER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: BlockCypherOptionsFactory) =>
        await optionsFactory.createBlockCypherOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
