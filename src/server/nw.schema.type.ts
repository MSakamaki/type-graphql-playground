import { Field, ObjectType, Int } from 'type-graphql';
import { IpAddressInput } from './nw.schema.input.type';

@ObjectType({ description: 'IP アドレス' })
export class IpAddress {
  @Field(_type => Int)
  octet1: number;
  @Field(_type => Int)
  octet2: number;
  @Field(_type => Int)
  octet3: number;
  @Field(_type => Int)
  octet4: number;
  @Field(_type => Int)
  octet5?: number;
  @Field(_type => Int)
  octet6?: number;

  @Field(_type => String, { description: 'IPをXXX.XXX.XXX.XXX形式として返す' })
  get ip(): string {
    return `${this.octet1}.${this.octet2}.${this.octet3}.${this.octet4}`;
  }

  equals(ip: IpAddress | IpAddressInput) {
    return (
      ip.octet1 === this.octet1 &&
      ip.octet2 === this.octet2 &&
      ip.octet3 === this.octet3 &&
      ip.octet4 === this.octet4
    );
  }
}

@ObjectType({ description: 'ルーター' })
export class Router {
  @Field({ deprecationReason: 'シリアルNO' })
  serial: string;
  @Field({ deprecationReason: '設置場所' })
  location: string;
  @Field(_type => IpAddress, { deprecationReason: 'グローバルポートIP' })
  gip: IpAddress;
  @Field(_type => IpAddress, { deprecationReason: 'ローカルポートIP' })
  localPorts: IpAddress[];

  @Field(_type => Int)
  portCount: number | null;
}
