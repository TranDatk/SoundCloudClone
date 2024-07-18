import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"
import { sendRequest } from "@/utils/api"
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"
import dayjs from "dayjs"
import { IUser } from "@/types/next-auth"


async function refreshAccessToken(token: JWT) {

  const resFetch = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: token?.refresh_token
    }),
  });

  const res = await resFetch.json();
  if (!res.error) {
    return {
      ...token,
      access_token: res?.data?.access_token ?? "",
      refresh_token: res?.data?.refresh_token ?? "",
      access_expire: dayjs(new Date()).add(
        +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
      ).unix(),
      error: ""
    }
  } else {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }

}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        const bodyObject = new URLSearchParams();
        bodyObject.append('username', credentials?.username || '');
        bodyObject.append('password', credentials?.password || '');

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyObject.toString(),
        });
        let res = await response.json();
        if (!res.error) {
          return res.data as any
        } else {
          throw new Error(res.error)
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      checks: ['none'],
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
        const resToBackEnd = await sendRequest<IBackendRes<IUserBackend>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/social-media`,
          method: "POST",
          body: {
            email: user?.email,
            image: user?.image,
            name: user?.name,
            type: 'GITHUB'
          }
        })
        if (resToBackEnd?.data?.user) {
          token.user = resToBackEnd?.data?.user;
          token.access_token = resToBackEnd?.data?.access_token;
          token.refresh_token = resToBackEnd?.data?.refresh_token;
          token.access_expire = dayjs(new Date()).add(
            +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
          ).unix();
        }
      } else if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.user = user.user;
        //@ts-ignore
        token.access_token = user.access_token;
        //@ts-ignore
        token.refresh_token = user.refresh_token;
        token.access_expire = dayjs(new Date()).add(
          +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
        ).unix();
      }
      else if (trigger === "signIn" && account?.provider === "google") {
        const resToBackEnd = await sendRequest<IBackendRes<IUserBackend>>({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/social-media`,
          method: "POST",
          body: {
            email: user?.email,
            image: user?.image,
            name: user?.name,
            type: 'GOOGLE'
          }
        });
        if (resToBackEnd?.data?.user) {
          const newUser = {
            ...resToBackEnd?.data?.user,
            avatar: user?.image ?? resToBackEnd?.data?.user?.avatar,
            name: user?.name ?? resToBackEnd?.data?.user?.name
          }
          token.user = newUser;
          token.access_token = resToBackEnd?.data?.access_token;
          token.refresh_token = resToBackEnd?.data?.refresh_token;
          token.access_expire = dayjs(new Date()).add(
            +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
          ).unix();
        }
      };

      const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number ?? 0)));
      if (isTimeAfter) {
        return refreshAccessToken(token)
      }

      return token;
    },
    session({ session, token, user }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
        session.error = token.error;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }