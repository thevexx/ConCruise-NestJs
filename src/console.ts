import { CommandFactory } from 'nest-commander';
import { AppConsoleModule } from './appConsole.module';

async function bootstrap() {
  await CommandFactory.runWithoutClosing(AppConsoleModule);
}

bootstrap();
