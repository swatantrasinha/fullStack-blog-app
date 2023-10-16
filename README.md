# Step 1 ==> make sure node version is appropriate(say node 18) and give below command 

    npx create-next-app full-stack-blog-app


# Step 2 ==> In tailwind.condif.ts, comment below lines as they are not needed

# Step3 ==> 
    npm install prisma --save-dev
    npx prisma init

after creating DB in monodb
# npx prisma generate
# npx prisma db push 

# npm i @primsa/client

prisma folder - new file "index.ts" and 
paste below lines in prisma folder-index.js
----------------------------------------------------
import {PrismaClient} from "@prisma/client"

let prisma: PrismaClient
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

if(process.env.NODE_ENV === 'production') {
    prisma= new PrismaClient();
} else {
    if(!global.prisma) {
        global.prisma= new PrismaClient();
    }
    prisma= global.prisma;
}
export default prisma;
----------------------------------------------------

app folder - create new folder "api" -> create new folder "blog" ==> new file "route.ts"

inside blog folder - create new folder "[id]" -> create new file "route.ts"
