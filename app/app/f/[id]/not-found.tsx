import { NotFoundScreen } from "@/components/not-found-screen";
import { STORE_LIMITS } from "@/lib/sealed";

export default function GiftNotFound() {
  return (
    <NotFoundScreen
      eyebrow="FLOR NÃO ENCONTRADA"
      title="Esta flor não está mais aqui"
      text={`Cada link vale por ${STORE_LIMITS.days} dias. Este pode ter vencido, ou o endereço chegou cortado.`}
    />
  );
}
