import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Float,
  Int,
  ResolverInterface,
  ObjectType,
  Field,
  InputType,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field() title: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType({ description: 'Object representing cooking recipe' })
export class Recipe {
  @Field() title: string;

  @Field(_type => String, {
    nullable: true,
    deprecationReason: 'Use `description` field instead',
  })
  get specification(): string | undefined {
    return this.description;
  }

  @Field({
    nullable: true,
    description: 'The recipe description with preparation info',
  })
  description?: string;

  @Field(_type => Int)
  ratings: number[];

  @Field() creationDate: Date;

  @Field(_type => Int)
  ratingsCount: number;

  @Field(_type => Float, { nullable: true })
  get averageRating(): number | null {
    const ratingsCount = this.ratings.length;
    if (ratingsCount === 0) {
      return null;
    }
    const ratingsSum = this.ratings.reduce((a, b) => a + b, 0);
    return ratingsSum / ratingsCount;
  }
}

export function createRecipeSamples() {
  return plainToClass(Recipe, [
    {
      description: 'Desc 1',
      title: 'Recipe 1',
      ratings: [0, 3, 1],
      creationDate: new Date('2018-04-11'),
    },
    {
      description: 'Desc 2',
      title: 'Recipe 2',
      ratings: [4, 2, 3, 1],
      creationDate: new Date('2018-04-15'),
    },
    {
      description: 'Desc 3',
      title: 'Recipe 3',
      ratings: [5, 4],
      creationDate: new Date(),
    },
  ]);
}

@Resolver(_objectType => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  private readonly items: Recipe[] = createRecipeSamples();

  @Query(_returns => Recipe, { nullable: true })
  async recipe(@Arg('title') title: string): Promise<Recipe | undefined> {
    return await this.items.find(recipe => recipe.title === title);
  }

  @Query(_returns => [Recipe], {
    description: 'Get all the recipes from around the world ',
  })
  async recipes(): Promise<Recipe[]> {
    return await this.items;
  }

  @Mutation(_returns => Recipe)
  async addRecipe(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = plainToClass(Recipe, {
      description: recipeInput.description,
      title: recipeInput.title,
      ratings: [],
      creationDate: new Date(),
    });
    await this.items.push(recipe);
    return recipe;
  }

  @FieldResolver()
  ratingsCount(
    @Root() recipe: Recipe,
    @Arg('minRate', _type => Int, { nullable: true })
    minRate: number = 0.0,
  ): number {
    return recipe.ratings.filter(rating => rating >= minRate).length;
  }
}
