import { Injectable } from '@nestjs/common';
import { Client } from 'blockcypher-apis';

@Injectable()
export class BlockCypherService extends Client {}
