import dotEnv from "dotenv";
import childProcess from "child_process";
import seedDb from "./seed";
dotEnv.config();

const RedisPassword = process.env.REDIS_PASSWORD;
const RedisContainerName = "Redis";

const dockerRunCmd = `docker run -d -p 3232:6379 --rm --name=${RedisContainerName} -e REDIS_PASSWORD=${RedisPassword} public.ecr.aws/ubuntu/redis:latest`;
const stopAndRmContainerCmd = `docker stop ${RedisContainerName}`;

const prepareTestDbEnvironment = async () => {
  try {
    childProcess.execSync(stopAndRmContainerCmd);
  } catch (err) {}
  childProcess.execSync(dockerRunCmd);
  const redis = await import("redis");
  const redisClient = redis.createClient({
    socket: {
      port: 3232,
      host: "localhost",
    },
    password: RedisPassword,
  });
  await redisClient.connect();
  await seedDb(redisClient);
  return redisClient;
};
export default prepareTestDbEnvironment;
