import type { Metadata } from 'next'
import Container from '@mui/material/Container';
import ClientSearch from './components/client.search';

export const metadata: Metadata = {
    title: 'Search your tracks',
    description: 'miêu tả',
}

const SearchPage = () => {
    return (
        <Container sx={{ mt: 3 }}>
            <ClientSearch />
        </Container>
    )
}

export default SearchPage;