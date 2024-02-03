import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './CldStrAdminDashboard.css';
import '../Components/Card.css';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import CldStrAdminNavbar from '../Components/CldStrAdminNavbar';
import BannerBackground from "../Assets/home-banner-background.png";
import AboutBackground from "../Assets/about-background_flatted.png";

// import AboutBackgroundOriginal from '../Assets/about-background.png'



Modal.setAppElement('#root');

const CldStrAdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
    const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [slotData, setSlotData] = useState({
        slot_image: '',
        slot_title: '',
        slot_area: '',
        slot_price: '',
    });
    const [editedInfo, setEditedInfo] = useState({
        cld_str_name: '',
        phno: '',
        address: '',
        description: '',
    });
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (event) => {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        };
        setImage(img);
    };

    const handleImgUpload = async () => {
        let formData = new FormData();
        formData.append('file', image.data);

        const response = axios.post(`${API_BASE_URL}/uploadFile`, formData);
        return response;
    };

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    };

    const handleAddSlotModalOpen = () => {
        setIsAddSlotModalOpen(true);
    };

    const handleAddSlotModalClose = () => {
        setIsAddSlotModalOpen(false);
    };

    const handleEditInfoModalOpen = () => {
        setIsEditInfoModalOpen(true);
    };

    const handleEditInfoModalClose = () => {
        setIsEditInfoModalOpen(false);
    };

    const handleEditInfo = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const request = {
            ...editedInfo
        };

        try {
            const response = await axios.put(
                `${API_BASE_URL}/edit_cld_str_info/${user._id}`,
                request,
                CONFIG_OBJ
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Your data has been Updated..!',
                });

                handleEditInfoModalClose(); // Close the modal after successful slot addition

                // Optionally, you can refresh or update the slots list on your page here
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while adding the slot',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while adding the slot',
            });
        }

        setLoading(false);
    }


    const handleAddSlot = async () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const imgRes = await handleImgUpload();
        const request = {
            ...slotData,
            slot_image: `${API_BASE_URL}/files/${imgRes.data.fileName}`, // You can adjust this to your needs
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/add_slot`,
                request,
                CONFIG_OBJ
            );

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Slot added successfully',
                });

                handleAddSlotModalClose(); // Close the modal after successful slot addition

                // Optionally, you can refresh or update the slots list on your page here
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while adding the slot',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while adding the slot',
            });
        }

        setLoading(false);
    };


    const uploadProfileImage = async () => {
        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Profile image is mandatory!',
            });
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            const request = { image: `${API_BASE_URL}/files/${imgRes.data.fileName}` };
            const user = JSON.parse(localStorage.getItem('user'));
            const postResponse = await axios.post(
                `${API_BASE_URL}/bannerProfileImage/${user._id}`,
                request,
                CONFIG_OBJ
            );
            setLoading(false);
            if (postResponse.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile image uploaded successfully',
                });
                window.location = "/cld_str_admin_dashboard";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while uploading profile image',
                });
            }
        }
    };

    const uploadBanner = async () => {
        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Banner image is mandatory!',
            });
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            const request = { image: `${API_BASE_URL}/files/${imgRes.data.fileName}` };
            const user = JSON.parse(localStorage.getItem('user'));
            const postResponse = await axios.post(
                `${API_BASE_URL}/bannerUpload/${user._id}`,
                request,
                CONFIG_OBJ
            );
            setLoading(false);
            if (postResponse.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banner image uploaded successfully',
                });
                window.location = "/cld_str_admin_dashboard";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while uploading banner image',
                });
            }
        }
    };

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        axios
            .get(`http://localhost:3001/coldstore_admin/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                // Handle any errors here, e.g., show an error message
            });
    }, []);

    const handleViewSlots = () => {
        navigate(`/view_slots/${JSON.parse(localStorage.getItem('user'))._id}`); // Navigate to the ViewSlots component
    };

    const bannerStyle = {
        backgroundColor: '#007BFF',
        position: 'relative',
        height: '200px',
    };

    const bannerImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
    };

    const profileStyle = {
        textAlign: 'center',
        padding: '20px',
    };

    const profileImageStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        cursor: 'pointer',
    };

    const editButtonStyle = {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const buttonsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Center the "Edit Coldstore Info" button vertically
        margin: '10px 0',
    };

    // console.log(JSON.parse(localStorage.getItem('user')).user_type)

    if (!user) {
        return null;
    }

    return (
        <div>
            <CldStrAdminNavbar />
            {/* <div className="about-background-image-container">
                <img src={AboutBackgroundOriginal} alt="" />
            </div> */}
            <div className="home-bannerImage-container">
                <img src={BannerBackground} alt="" />
            </div>
            <header style={bannerStyle}>
                <img
                    src={user.bannerImage}
                    alt="Coldstore Banner"
                    style={bannerImageStyle}
                    onClick={() => setIsBannerModalOpen(true)}
                />
            </header>
            <main style={profileStyle}>
                <img
                    src={user.profileImage}
                    alt="Profile Picture"
                    style={profileImageStyle}
                    onClick={() => setIsProfileModalOpen(true)}
                />
                <h1>{user.cld_str_name}</h1>
                <p>{user.cld_str_name} - {user.state} - {user.district} - {user.mandal}</p>
                <div style={buttonsContainerStyle}>

                    <button
                        onClick={handleAddSlotModalOpen}
                        className="secondary-button bg-warning"
                    >
                        Add Slots
                    </button>
                    <button
                        onClick={handleEditInfoModalOpen}
                        className="secondary-button"
                    >
                        Edit Coldstore Info
                    </button>
                    <button
                        onClick={() =>
                            handleViewSlots()
                        }
                        className="secondary-button bg-info"
                    >
                        View Slots
                    </button>
                </div>
            </main>

            <Modal
                isOpen={isBannerModalOpen}
                onRequestClose={() => setIsBannerModalOpen(false)}
                contentLabel="Upload Banner"
                style={{
                    content: {
                        width: '80%',
                        height: '400px',
                        maxWidth: '400px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
            >
                <h2 className='text-white'>Upload Banner</h2>
                <img
                    src={user.bannerImage}
                    alt="Current Banner"
                    style={{ width: '100%', objectFit: 'cover' }}
                />

                <div className=''>
                    <div className='upload-box'>
                        <div className="dropZoneContainer">
                            <input name="file" type="file" id="drop_zone" className="FileUpload" style={{ backgroundColor: 'red' }} accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                            <div className="dropZoneOverlay">
                                {image.preview && <img src={image.preview} width='150' height='150' />}
                                <i class="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                        </div>
                    </div>
                </div>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}
                <button
                    onClick={() => uploadBanner()}
                    className="btn btn-warning mt-3 "
                >
                    Upload Banner Image
                </button>
            </Modal>

            <Modal
                isOpen={isProfileModalOpen}
                onRequestClose={() => setIsProfileModalOpen(false)}
                contentLabel="Upload Profile Image"
                style={{
                    content: {
                        width: '80%',
                        height: '500px',
                        maxWidth: '400px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
            >
                <h2 className='text-white'>Upload Profile Image</h2>
                <img
                    src={user.profileImage}
                    alt="Current Profile Image"
                    style={{ width: '100%', objectFit: 'cover' }}
                />


                <div className=''>
                    <div className='upload-box'>
                        <div className="dropZoneContainer">
                            <input name="file" type="file" id="drop_zone" className="FileUpload" style={{ backgroundColor: 'red' }} accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                            <div className="dropZoneOverlay">
                                {image.preview && <img src={image.preview} width='150' height='150' />}
                                <i class="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                        </div>
                    </div>
                </div>
                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}

                <button
                    onClick={() => uploadProfileImage()}
                    className="btn btn-warning mt-3 "
                >
                    Upload Profile Image
                </button>
            </Modal>
            {/* <Footer style={{display:'flex',position:'absolute'}} /> */}

            <Modal
                isOpen={isAddSlotModalOpen}
                onRequestClose={handleAddSlotModalClose}
                contentLabel="Add Slot"
                style={{
                    content: {
                        width: '80%',
                        maxWidth: '400px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
            >
                <h2 className='text-white'>Add Slot</h2>
                <div className=''>
                    <div className='upload-box'>
                        <div className="dropZoneContainer">
                            <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                            <div className="dropZoneOverlay">
                                {image.preview && <img src={image.preview} width='150' height='150' />}
                                <i className="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Slot Image
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Slot Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Slot Title"
                        value={slotData.slot_title}
                        onChange={(e) => setSlotData({ ...slotData, slot_title: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Slot Area (in square units)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Slot Area"
                        value={slotData.slot_area}
                        onChange={(e) => setSlotData({ ...slotData, slot_area: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Slot Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Slot Price"
                        value={slotData.slot_price}
                        onChange={(e) => setSlotData({ ...slotData, slot_price: e.target.value })}
                    />
                </div>

                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}

                <button
                    onClick={handleAddSlot}
                    className="btn btn-warning mt-3 "
                >
                    Add Slot
                </button>
            </Modal>


            <Modal
                isOpen={isEditInfoModalOpen}
                onRequestClose={handleEditInfoModalClose}
                contentLabel="Edit Info"
                style={{
                    content: {
                        width: '80%',
                        maxWidth: '400px',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                }}
            >
                <h2 className='text-white'>Edit Coldstore Info</h2>
                <div className="mb-3">
                    <label className="form-label text-white">Coldstore Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cld_str_name"
                        value={editedInfo.cld_str_name}      
                        onChange={(e) => setEditedInfo({ ...editedInfo, cld_str_name: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phno"
                        value={editedInfo.phno}
                        onChange={(e) => setEditedInfo({ ...editedInfo, phno: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Address</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={editedInfo.address}
                        onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label text-white">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={editedInfo.description}
                        onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
                    />
                </div>

                {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : ''}

                <button
                    onClick={handleEditInfo}
                    className="btn btn-warning mt-3"
                >
                    Save Changes
                </button>
            </Modal>


            <div className="about-background-image-container" >
                <img src={AboutBackground} alt="" />
            </div>
        </div>
    );
}

export default CldStrAdminDashboard;
