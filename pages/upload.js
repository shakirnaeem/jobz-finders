export default function Home(props) {
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var fileName = event.target.files[0].name;
            setImageFile(event.target.files[0]);
            setExternsion(fileName.split('.')[1]);
            // const reader = new FileReader();
            // reader.onload = () => {
            //     setImageFile(reader.result);
            // };

            // reader.readAsDataURL(event.target.files[0]);
        }
    };
}