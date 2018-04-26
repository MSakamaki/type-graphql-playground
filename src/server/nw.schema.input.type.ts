import { InputType, Field, Int } from 'type-graphql';

@InputType({ description: 'ルーター' })
export class RouterInput {
  @Field({ deprecationReason: 'シリアルNO' })
  serial: string;
  @Field({ deprecationReason: '設置場所' })
  location: string;
}

@InputType({ description: 'IpAddress' })
export class IpAddressInput {
  @Field(_type => Int)
  octet1: number;
  @Field(_type => Int)
  octet2: number;
  @Field(_type => Int)
  octet3: number;
  @Field(_type => Int)
  octet4: number;
  @Field(_type => Int, { nullable: true })
  octet5?: number;
  @Field(_type => Int, { nullable: true })
  octet6?: number;
}
