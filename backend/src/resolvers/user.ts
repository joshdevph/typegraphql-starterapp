import { Arg, Query, Mutation, Resolver, InputType, Field } from "type-graphql";
import { Accounts } from "../entity/user.entity";

@InputType()
class UserArgs{
    @Field()
    username: string

    @Field()
    name: string

    @Field()
    password: string
}
@Resolver()
export class UserResolver{
    @Query(() => [Accounts])
    userList(){
        return Accounts.find();
    }

    @Mutation(() => Accounts)
    async registerUser(
        @Arg('args', () => UserArgs)
        args: UserArgs
    ){
        const user = await Accounts.create(args).save()
        return user
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg('id') id: number,
        @Arg('args', () => UserArgs)
        args: UserArgs
    ){
        const user = await Accounts.update({id}, args)
        return !!user
    }
    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('id') id: number,
    ){
        const user = await Accounts.delete({id})
        return !!user
    }
}