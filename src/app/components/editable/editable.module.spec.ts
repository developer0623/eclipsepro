import { EditableModule } from './editable.module';

describe('EditableModule', () => {
  let editableModule: EditableModule;

  beforeEach(() => {
    editableModule = new EditableModule();
  });

  it('should create an instance', () => {
    expect(editableModule).toBeTruthy();
  });
});
