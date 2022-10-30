import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

import Handlebars from 'handlebars';

// Instantiate Prisma Client
const prisma = new PrismaClient();
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 465,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }: { identifier: any; url: string }) => {
    const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
        encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    transporter.sendMail({
        from: `"✨ Gharbash" ${process.env.EMAIL_FROM}`,
        to: identifier,
        subject: 'Your sign-in link for Gharbash',
        html: emailTemplate({
            base_url: process.env.NEXTAUTH_URL,
            signin_url: url,
            email: identifier,
        }),
    });
};
const sendWelcomeEmail = async ({ user }: { user: any }) => {
    const { email } = user;

    try {
        const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
            encoding: 'utf8',
        });
        const emailTemplate = Handlebars.compile(emailFile);
        await transporter.sendMail({
            from: `"✨ Gharbash" ${process.env.EMAIL_FROM}`,
            to: email,
            subject: 'Welcome to Gharbash! 🎉',
            html: emailTemplate({
                base_url: process.env.NEXTAUTH_URL,
                support_email: 'maharjannimesh11@gmail.com',
            }),
        });
    } catch (error) {
        console.log(`❌ Unable to send welcome email to user (${email})`);
    }
};
export default NextAuth({
    providers: [
        EmailProvider({
            maxAge: 10 * 60,
            sendVerificationRequest,
        }),
        GoogleProvider({
            id: 'google',
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            id: 'github',
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        verifyRequest: '/',
        error: '/',
    },
    events: {
        createUser: sendWelcomeEmail,
    },
});
