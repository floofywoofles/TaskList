import { Sequelize, Model, DataTypes } from 'sequelize';

const args = process.argv.slice(2);

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/todo.db"
});

const TODO_ENTRY = sequelize.define('Todo_Items', {
    title: DataTypes.STRING,
    priority: DataTypes.STRING
});

const PRIORITIES = ["low","medium","high"];

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

async function add(title: string, priority: string){
    if(!title.length) {
        console.log("Invalid title length. Make sure title is not empty");
        process.exit(1);
    }

    if(PRIORITIES.indexOf(priority) === -1){
        console.log(`Invalid priority: ${priority}`);
        process.exit(1);
    }

    const check = await TODO_ENTRY.findOne({where: {title: title}});

    if(check){
        console.log(`Entry already exists: ${title}`);
        process.exit(1);
    }

    const item = await TODO_ENTRY.create({title: title, priority: priority});

}

async function sync(){
    await sequelize.sync().then(()=>{
        console.log("Saved data successfully");
    }).catch((error:Error)=>{
        console.error(`An error occurred: ${error}`);
    });
}

async function main (){
    await connect();
    console.log(args);

    if(args.length < 3){
        console.log("Please add more arguments, or valid arguments");
        process.exit(1);
    }

    console.log(args);

    const operation = args[0];

    switch(operation){
        case "add":
            // args[1] is title, args[2] is priority
            add(args[1],args[2]);
            break;
        
        default:
            console.log(`Invalid operation: ${operation}`);
            process.exit(1);
            break;
    }
    await sync();
}

main();
