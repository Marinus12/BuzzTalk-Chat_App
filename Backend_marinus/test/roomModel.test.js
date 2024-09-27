import Room from '../models/Room';
import chai from 'chai';

const { expect } = chai;

describe('Room Model', () => {
  it('should create a new room', async () => {
    const room = new Room({
      name: 'Room 101',
      description: 'A public room',
      type: 'public',
      createdBy: 'John Doe'
    });

    const savedRoom = await room.save();
    expect(savedRoom).to.have.property('_id');
    expect(savedRoom).to.have.property('name', 'Room 101');
  });
});
