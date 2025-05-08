type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
};

export const toast = ({ title, description, duration = 3000 }: ToastProps) => {
  console.log("[Toast]", { title, description });
  
  if (typeof window !== "undefined") {
    const toastElement = document.createElement("div");
    toastElement.className = "fixed top-4 right-4 bg-background border rounded-md p-4 shadow-md z-50 max-w-md";
    
    const toastContent = document.createElement("div");
    toastContent.innerHTML = `
      ${title ? `<h3 class="font-medium mb-1">${title}</h3>` : ''}
      ${description ? `<p class="text-muted-foreground text-sm">${description}</p>` : ''}
    `;
    
    toastElement.appendChild(toastContent);
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.style.opacity = "0";
      toastElement.style.transition = "opacity 0.3s ease";
      
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 300);
    }, duration);
  }
};