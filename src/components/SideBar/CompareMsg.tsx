import { useEffect, useState } from "react"
import { DanyPoste, SIGPoste } from "../../interfaces/interfaces"
import { Button } from '@mui/material'

interface CompareMsgProps {
  comparedSIGPost: SIGPoste | undefined
  comparedDanyPost: DanyPoste | undefined
  gdoPoste: string | undefined
  handleCompare: () => void
}

const CompareMsg = ({
  comparedSIGPost,
  comparedDanyPost,
  gdoPoste,
  handleCompare
}: CompareMsgProps) => {
  const [bgColor, setBgColor] = useState('')
  const [hoverBgColor, setHoverBgColor] = useState('')

  useEffect(() => {
    if (comparedSIGPost !== undefined && comparedSIGPost.poste === gdoPoste) {
      setBgColor('darkred')
      setHoverBgColor('red')
    } else if (comparedDanyPost !== undefined && comparedDanyPost.poste === gdoPoste) {
      setBgColor('darkred')
      setHoverBgColor('red')
    } else {
      setBgColor('darkgreen')
      setHoverBgColor('green')
    }
  },[comparedSIGPost, comparedDanyPost, gdoPoste])

  return (
    <Button variant="contained"
      sx={{
        width: '90%',
        marginBottom: '1em',
        backgroundColor: bgColor,
        '&:hover': {
          backgroundColor: hoverBgColor,
        },
      }}
      onClick={handleCompare}
    >
      {(comparedSIGPost !== undefined
        && comparedSIGPost.poste === gdoPoste) ||
        (comparedDanyPost !== undefined
          && comparedDanyPost.poste === gdoPoste)
        ? 'Annuler la comparaison' : 'Comparer'}
    </Button>
  )
}

export default CompareMsg