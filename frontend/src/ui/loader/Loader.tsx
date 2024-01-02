import { Loader2 } from "lucide-react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  style?: string;
}

export function Loader({ style }: LoaderProps) {
  return <Loader2 className={`${styles.loader} ${style && style}`} />;
}
