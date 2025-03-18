const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      console.log("Tentando registrar o Service Worker...");
      const registration = await navigator.serviceWorker.register("/sw.js");

      if (registration.active) {
        console.log("✅ Service Worker já ativo!");
        return registration;
      }

      return new Promise<ServiceWorkerRegistration>((resolve) => {
        const checkState = () => {
          if (registration.active) {
            console.log("✅ Service Worker ativado!");
            resolve(registration);
          } else {
            console.log("⏳ Aguardando ativação do Service Worker...");
            setTimeout(checkState, 500);
          }
        };
        checkState();
      });
    } catch (error) {
      console.error("❌ Falha ao registrar o Service Worker:", error);
      return null;
    }
  } else {
    console.error("❌ O navegador não suporta Service Workers.");
    return null;
  }
};

export const usePushNotifications = () => {
  const subscribeUser = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      console.error("Notificações não são suportadas neste navegador.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("O usuário negou a permissão para notificações.");
      return;
    }

    const registration = await registerServiceWorker();
    console.log("🚀 ~ subscribeUser ~ registration:", registration);

    if (!registration?.pushManager) return;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!))
        ),
        auth: btoa(
          String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!))
        ),
      },
    };

    console.log("🚀 ~ Usuário inscrito:", subscriptionData);

    return subscriptionData
  };

  return { subscribeUser };
};
