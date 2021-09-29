import type { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import type { ClientOptions } from 'blockcypher-apis';

export type BlockCypherModuleOptions = ClientOptions;

export interface BlockCypherOptionsFactory {
  createBlockCypherOptions():
    | Promise<BlockCypherModuleOptions>
    | BlockCypherModuleOptions;
}

export interface BlockCypherModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<BlockCypherOptionsFactory>;
  useClass?: Type<BlockCypherOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BlockCypherModuleOptions> | BlockCypherModuleOptions;
  inject?: any[];
}
