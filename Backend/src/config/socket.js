// Socket.IO configuration and handlers
let ioInstance = null;

export const initializeSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Join user to their personal room (for targeted notifications)
    socket.on('join:user', (userId) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`User ${socket.id} joined room: user:${userId}`);
      }
    });

    // Join exam-specific room
    socket.on('join:exam', (examId) => {
      socket.join(`exam:${examId}`);
      console.log(`User ${socket.id} joined room: exam:${examId}`);
    });

    // Leave exam room
    socket.on('leave:exam', (examId) => {
      socket.leave(`exam:${examId}`);
      console.log(`User ${socket.id} left room: exam:${examId}`);
    });

    // Join study room
    socket.on('join:studyroom', (roomId) => {
      socket.join(`studyroom:${roomId}`);
      const roomSize = io.sockets.adapter.rooms.get(`studyroom:${roomId}`)?.size || 0;
      io.to(`studyroom:${roomId}`).emit('studyroom:users', { count: roomSize });
      console.log(`User ${socket.id} joined study room: ${roomId}`);
    });

    // Leave study room
    socket.on('leave:studyroom', (roomId) => {
      socket.leave(`studyroom:${roomId}`);
      const roomSize = io.sockets.adapter.rooms.get(`studyroom:${roomId}`)?.size || 0;
      io.to(`studyroom:${roomId}`).emit('studyroom:users', { count: roomSize });
      console.log(`User ${socket.id} left study room: ${roomId}`);
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      console.log(`🔌 User disconnected: ${socket.id}, reason: ${reason}`);
    });
  });

  return io;
};

// Get socket instance for use in controllers
export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized');
  }
  return ioInstance;
};

// Emit notification to specific user
export const emitToUser = (userId, event, data) => {
  if (ioInstance) {
    ioInstance.to(`user:${userId}`).emit(event, data);
  }
};

// Emit to all connected users
export const emitToAll = (event, data) => {
  if (ioInstance) {
    ioInstance.emit(event, data);
  }
};

// Emit to exam subscribers
export const emitToExam = (examId, event, data) => {
  if (ioInstance) {
    ioInstance.to(`exam:${examId}`).emit(event, data);
  }
};

export default { initializeSocket, getIO, emitToUser, emitToAll, emitToExam };
