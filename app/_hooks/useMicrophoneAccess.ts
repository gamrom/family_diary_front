import { useEffect, useState } from "react";
export type UsePermissionState = "granted" | "denied" | "prompt" | "loading";

export function useMicrophonePermission() {
  const [permissionState, setPermissionState] =
    useState<UsePermissionState>("loading");

  useEffect(() => {
    (window.navigator.permissions as any)
      .query({ name: "microphone" })
      .then(function (result: PermissionStatus) {
        setPermissionState(result.state);
      });
  }, []);

  const requestMicrophone = () => {
    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setPermissionState("granted");
      })
      .catch(function (err) {
        console.error("Microphone access error:", err);
        setPermissionState("denied");
      });
  };

  return {
    permissionState,
    requestMicrophone,
  };
}
