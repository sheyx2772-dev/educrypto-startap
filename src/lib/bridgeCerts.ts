export interface CertConfig {
  src: string;
  noBg?: boolean;
}

/** Ko'prikdagi 3 ta sertifikat — har biriga alohida PNG */
const CERT_CONFIG: Record<string, CertConfig> = {
  p11: { src: "/game/bridge-certs/cert-paper.png" },
  p21: { src: "/game/bridge-certs/cert-medal.png" },
  p39: { src: "/game/bridge-certs/cert-trophy.png", noBg: true },
};

export const BRIDGE_CERT_SIZE = 148;

export function getCertConfig(nodeId: string): CertConfig {
  return CERT_CONFIG[nodeId] ?? { src: "/game/bridge-certs/cert-paper.png" };
}
