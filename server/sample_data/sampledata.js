let authors = [
    {
        id: "1",
        first_name: "Zero",
        last_name: "0",
        bio: "Software programmer and writer",
        posts: zero_posts,
        roles: "author",
    },
    {
        id: "2",
        first_name: "Martian",
        last_name: "mars",
        bio: "Electronics engineer and a passionate writer",
        posts: [],
        roles: "author",
    },
    {
        id: "3",
        first_name: "Sasuke",
        last_name: "OnePiece",
        bio: "Professional chai smoker and blogger",
        posts: [],
        roles: "author",
    },
]

const zero = authors.filter((author) => {
    return author.id === "1"
})

const martian = authors.filter((author) => {
    return author.id === "2"
})

const kuntal = authors.filter((author) => {
    return author.id === "3"
})

let posts = [
    {
        id: "1",
        title: "Dropbox acquires Boxcryptor assets to bring zero-knowledge encryption to file storage",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/Boxcryptor-e1669736040737.webp?w=1390&crop=1",
        description: "Dropbox has announced plans to bring end-to-end encryption to its business users, and its doing so through acquiring “key assets” from Germany-based cloud security company Boxcryptor. Terms of the deal were not disclosed. Dropbox is well-known for its cloud-based file back-up and sharing services, and while it does offer encryption for files moving between its servers and the destination, Dropbox itself has access to the keys and can technically view any content passing through. What Boxcryptor brings to the table is an extra layer of security via so-called “zero knowledge” encryption on the client side, giving the user full control over who is allowed to decrypt their data. For many people, such as consumers storing family photos or music files, this level of privacy might not be a major priority. But for SMEs and enterprises, end-to-end encryption is a big deal as it ensures that no intermediary can access their confidential documents stored in the cloud — its encrypted before it even arrives.",
        author_id: zero[0].id,
        category: "Gadgets And Apps",
    },
    {
        id: "2",
        title: "Spotify Wrapped 2022 arrives with new features like your Listening Personality, 40K+ Artist Messages",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/Minutes-Share.jpg?w=1390&crop=1",
        description: "Spotify Wrapped 2022 has officially arrived. Though other music services, including Apple Music and YouTube Music, now put together their own year-end retrospectives, Spotify’s personalized and interactive Wrapped experience for its users, creators and podcasters remains the one to beat. The secret to its ongoing success is how it goes beyond simply offering a summary of top songs or artists to also include fun, shareable elements for music and audio fans to explore, post to social media and compare with their friends.  The Wrapped experience has grown in popularity over the years. In 2017, some 30 million Spotify users accessed Wrapped; by last year, that figure had grown to more than 120 million. In addition, there were nearly 60 million shares of Wrapped stories and cards across social platforms in 2021.",
        author_id: zero[0].id,
        category: "Gadgets And Apps",
    },
    {
        id: "3",
        title: "Iterative launches its second fund for Southeast Asia startups",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-92211627.jpg?w=1390&crop=1",
        description: "Despite global headwinds, Southeast Asia's early-stage startups are still going strong, say the founders of Iterative Capital. The Singapore-based venture capital firm, which runs a YC-style accelerator program, announced today it has raised $55 million for its Fund II from LPs like Cendana, K5 Global, Village Global and Goodwater Capital. Other backers include a group of founders and executives, such as Dropbox co-founder Arash Ferdowsi, Bukalapak co-founder and former CEO Achmad Zaky, Andreessen Horowitz general partner Andrew Chen, former YC COO Qasar Younis, former Foursquare CEO David Shim and Airbnb Asia head Kum Hong Siew.",
        author_id: martian[0].id,
        category: "Science And Technology",
    },
    {
        id: "4",
        title: "Iterative launches its second fund for Southeast Asia startups",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-92211627.jpg?w=1390&crop=1",
        description: "Despite global headwinds, Southeast Asia's early-stage startups are still going strong, say the founders of Iterative Capital. The Singapore-based venture capital firm, which runs a YC-style accelerator program, announced today it has raised $55 million for its Fund II from LPs like Cendana, K5 Global, Village Global and Goodwater Capital. Other backers include a group of founders and executives, such as Dropbox co-founder Arash Ferdowsi, Bukalapak co-founder and former CEO Achmad Zaky, Andreessen Horowitz general partner Andrew Chen, former YC COO Qasar Younis, former Foursquare CEO David Shim and Airbnb Asia head Kum Hong Siew.",
        author_id: kuntal[0].id,
        category: "Science And Technology",
    },
    {
        id: "5",
        title: "Iterative launches its second fund for Southeast Asia startups",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-92211627.jpg?w=1390&crop=1",
        description: "Despite global headwinds, Southeast Asia's early-stage startups are still going strong, say the founders of Iterative Capital. The Singapore-based venture capital firm, which runs a YC-style accelerator program, announced today it has raised $55 million for its Fund II from LPs like Cendana, K5 Global, Village Global and Goodwater Capital. Other backers include a group of founders and executives, such as Dropbox co-founder Arash Ferdowsi, Bukalapak co-founder and former CEO Achmad Zaky, Andreessen Horowitz general partner Andrew Chen, former YC COO Qasar Younis, former Foursquare CEO David Shim and Airbnb Asia head Kum Hong Siew.",
        author_id: kuntal[0].id,
        category: "Science And Technology",
    },
    {
        id: "6",
        title: "Iterative launches its second fund for Southeast Asia startups",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-92211627.jpg?w=1390&crop=1",
        description: "Despite global headwinds, Southeast Asia's early-stage startups are still going strong, say the founders of Iterative Capital. The Singapore-based venture capital firm, which runs a YC-style accelerator program, announced today it has raised $55 million for its Fund II from LPs like Cendana, K5 Global, Village Global and Goodwater Capital. Other backers include a group of founders and executives, such as Dropbox co-founder Arash Ferdowsi, Bukalapak co-founder and former CEO Achmad Zaky, Andreessen Horowitz general partner Andrew Chen, former YC COO Qasar Younis, former Foursquare CEO David Shim and Airbnb Asia head Kum Hong Siew.",
        author_id: martian[0].id,
        category: "Science And Technology",
    },
    {
        id: "7",
        title: "Iterative launches its second fund for Southeast Asia startups",
        imgUrl: "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-92211627.jpg?w=1390&crop=1",
        description: "Despite global headwinds, Southeast Asia's early-stage startups are still going strong, say the founders of Iterative Capital. The Singapore-based venture capital firm, which runs a YC-style accelerator program, announced today it has raised $55 million for its Fund II from LPs like Cendana, K5 Global, Village Global and Goodwater Capital. Other backers include a group of founders and executives, such as Dropbox co-founder Arash Ferdowsi, Bukalapak co-founder and former CEO Achmad Zaky, Andreessen Horowitz general partner Andrew Chen, former YC COO Qasar Younis, former Foursquare CEO David Shim and Airbnb Asia head Kum Hong Siew.",
        author_id: zero[0].id,
        category: "Science And Technology",
    },
]

const zero_posts = posts.filter((filtered_posts) => {
    return filtered_posts.author_id === "1";
})
module.exports = posts;