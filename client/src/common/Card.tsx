import { createUseStyles } from "react-jss"
import { Theme } from "../theme"

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    borderRadius: theme.borderRadius,
    boxShadow: '0 0 5px #ededed',
    background: '#fff',
    padding: theme.spacing,
    marginBottom: 20
  }
}));

type CardProps = {
  children: React.ReactNode,
  className?: string
}
export default function Card({children, className}: CardProps) {
  return <div className={[useStyles().card, className].join(' ')}>
    {children}
  </div>
}
