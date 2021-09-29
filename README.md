# nestjs-blockcypher
> A Nestjs module for blockcypher-apis

## Installation
```sh
yarn add nestjs-blockcypher blockcypher-apis
# npm install ...
```

## Usage
`app.service.ts`
```ts
...
import { BlockCypherService } from 'nestjs-blockcypher';
@Injectable()
export class AppService {
  constructor(
    // BlockCypherService is an instance of Client from blockcypher-apis
    private readonly blockCypherService: BlockCypherService,
  )
  
  getTransaction(hash: string) {
    return this.blockCypherService.apis.transaction.getTransactionByHash(hash);
  }
}
```
`app.module.ts`
```ts
...
import { BlockCypherModule } from 'nestjs-blockcypher';

@Module({
  imports: [BlockCypherModule.register({
    coin: ...,
    chain: ...,
    token: ...,
  })],
  ...
})
export class AppModule {}
```
