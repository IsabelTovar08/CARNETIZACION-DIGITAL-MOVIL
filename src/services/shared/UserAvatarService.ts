/// <summary>
/// Servicio compartido para obtener el avatar de un usuario.
/// Si no hay foto disponible, genera un ícono o iniciales.
/// </summary>

import { UserProfile } from "../../models/userProfile";

export class UserAvatarService {
  /// <summary>
  /// Obtiene la URL de la foto del usuario o null si no hay.
  /// </summary>
  /// <param name="user">Usuario autenticado</param>
  public static getPhotoUrl(user: UserProfile | null): string | null {
    if (user?.photoUrl) return user.photoUrl;
    return null;
  }

  /// <summary>
  /// Genera las iniciales del usuario a partir del nombre completo.
  /// </summary>
  /// <param name="user">Usuario autenticado</param>
  /// <returns>Iniciales en mayúscula (ej: "MT")</returns>
  public static getInitials(user: UserProfile | null): string {
    if (!user?.currentProfile?.personName) return "?";

    const parts = user.currentProfile.personName.trim().split(" ");
    const initials = parts.map((p) => p[0]?.toUpperCase() || "").slice(0, 2).join("");
    return initials || "?";
  }

  /// <summary>
  /// Devuelve un color de fondo consistente basado en las iniciales del usuario.
  /// (Ideal para mostrar círculos de avatar sin imagen).
  /// </summary>
  public static getBackgroundColor(initials: string): string {
    const colors = ["#007BFF", "#6C757D", "#17A2B8", "#28A745", "#FFC107", "#DE718BFF"];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  }
}
