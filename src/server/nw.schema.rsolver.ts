import {
  Resolver,
  ResolverInterface,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Router, IpAddress } from './nw.schema.type';
import { RouterInput, IpAddressInput } from './nw.schema.input.type';
import { plainToClass } from 'class-transformer';

@Resolver(_objectType => Router)
export class RouterResolver implements ResolverInterface<Router> {
  private genIp = (
    octet1: number,
    octet2: number,
    octet3: number,
    octet4: number,
    octet5?: number,
    octet6?: number,
  ): IpAddress =>
    plainToClass(IpAddress, {
      octet1: octet1,
      octet2: octet2,
      octet3: octet3,
      octet4: octet4,
      octet5: octet5,
      octet6: octet6,
    });

  private readonly items: Router[] = plainToClass(Router, [
    {
      serial: '1',
      location: 'Tokyo',
      gip: this.genIp(192, 168, 1, 1),
      localPorts: [this.genIp(192, 168, 1, 2), this.genIp(192, 168, 1, 3)],
    },
    {
      serial: '2',
      location: 'Tokyo',
      gip: this.genIp(192, 168, 1, 2),
      localPorts: [],
    },
    {
      serial: '3',
      location: 'Tokyo',
      gip: this.genIp(192, 168, 1, 3),
      localPorts: [],
    },
  ]);

  @Query(_returns => Router, { nullable: true })
  async router(
    @Arg('IpAddress') IpAddressInput: IpAddressInput,
  ): Promise<Router | undefined> {
    return await this.items.find(Router => Router.gip.equals(IpAddressInput));
  }

  @Query(_returns => [Router])
  async routers(): Promise<Router[]> {
    return await this.items;
  }

  @Mutation(_returns => Router)
  async addRouter(@Arg('Router') RouterInput: RouterInput): Promise<Router> {
    const router = plainToClass(Router, {
      serial: RouterInput.serial,
      location: RouterInput.location,
    });
    await this.items.push(router);
    return router;
  }

  @FieldResolver()
  portCount(@Root() recipe: Router): number {
    return recipe.localPorts.length;
  }
}
