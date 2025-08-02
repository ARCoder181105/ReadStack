import axios from "axios";



const fetchBookCover = async (title) => {
    try {
        const response = await axios.get('https://openlibrary.org/search.json', {
            params: { title }
        });

        const data = response.data;

        if (data.docs && data.docs[0]?.cover_i) {
            const coverId = data.docs[0].cover_i;
            return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
        } else {
            return 'https://via.placeholder.com/150?text=No+Cover';
        }

    } catch (error) {
        console.error("Error fetching book cover:", error);
        return 'https://via.placeholder.com/150?text=No+Found';
    }
}

export default fetchBookCover