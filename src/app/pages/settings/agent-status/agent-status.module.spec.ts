import { AgentStatusModule } from './agent-status.module';

describe('AgentStatusModule', () => {
  let agentStatusModule: AgentStatusModule;

  beforeEach(() => {
    agentStatusModule = new AgentStatusModule();
  });

  it('should create an instance', () => {
    expect(agentStatusModule).toBeTruthy();
  });
});
