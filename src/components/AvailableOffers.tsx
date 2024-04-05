import { Box, Button, FormControl, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OfferCard from './OfferCard'
import { AllAccountTypes, Offer } from '../models'
import { useState } from 'react';
import AccountTypeSelect from './AccountTypeSelect';
import SortBySelect from './SortBySelect';

interface AvailableOffersProps {
  offers: Offer[]
  saveOffer: (offer: Offer) => void
}

export default function AvailableOffers({offers, saveOffer}: AvailableOffersProps) {
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>(AllAccountTypes)
  const [sortBy, setSortBy] = useState<string>("")

  const displayedOffers = offers.filter(o => selectedAccountTypes.includes(o.accountType))
                                .sort((a, b) => {
                                  if (sortBy === "ascending bonus") {
                                    return a.bonus - b.bonus
                                  }
                                  else {
                                    return b.bonus - a.bonus
                                  }
                                } )


  function onResetClick() {
    setSelectedAccountTypes(AllAccountTypes);
    setSortBy("descending bonus")
  }
  

  return (
    <Box component="section">
        <Typography variant='h2'>Available Offers</Typography>
        <FormControl fullWidth sx={{display: "flex", flexDirection: 'row', gap: "0.5rem"}}>
          <AccountTypeSelect selectedTypes={selectedAccountTypes} setSelectedTypes={setSelectedAccountTypes} />
          <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
        </FormControl>

        <Button onClick={onResetClick}>Reset</Button>
        
        <Box>
          {displayedOffers.map((offer, i) => 
            <OfferCard key={i} offer={offer} action={
              <IconButton aria-label="add button" color='primary' size='large' onClick={() => saveOffer(offer)}>
                <AddCircleOutlineIcon fontSize="inherit" />
              </IconButton>
            }/>
          )}
        </Box>
      </Box>
  )
}