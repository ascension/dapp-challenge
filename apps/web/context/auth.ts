import React from "react";

export const AuthContext = React.createContext<{ isAuthed: boolean }>({
  isAuthed: false,
});
