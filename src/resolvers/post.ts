import {Arg, Ctx, Int, Mutation, Query, Resolver} from 'type-graphql';
import {Post} from "../entities";
import {EMContext} from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: EMContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true   })
    post(
        @Arg('id') id: number,
        @Ctx() { em }: EMContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: EMContext
    ): Promise<Post> {
        const post = em.create(Post, { title });
        await em.persistAndFlush(post);

        return post;
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id', () => Int, { nullable: true }) id: number,
        @Arg('title') title: string,
        @Ctx() { em }: EMContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id });

        if (!post) return null;

        if (title) {
            post.title = title;
            await em.persistAndFlush(post);
        }

        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { em }: EMContext
    ): Promise<boolean> {
        try {
            await em.nativeDelete(Post, { id });
            return true;
        } catch (err) {
            return false;
        }
    }
}
