import { Sequelize, Model, DataTypes } from 'sequelize';

const args = process.argv.slice(2);

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/todo.db"
});

const TODO_ENTRY = sequelize.define('Todo_Items', {
    name: DataTypes.STRING,
    content: DataTypes.STRING
});

async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

async function main (){
    await connect();
    console.log(args);

    if(args.length < 3){
        console.log("Please add more arguments, or valid arguments");
        process.exit(1);
    }

    
}

main();
