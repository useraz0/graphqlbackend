const { ApolloServer } = require("apollo-server");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 5000;

server
  .listen(5000)
  .then(({ url }) => console.log(`Server running at: ${url}`.magneta))
  .catch((err) => console.log(err));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  server.close(() => process.exit(1));
});
