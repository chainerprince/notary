import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { clearErrors } from "../../state/actions/notifierAction";
import { newNotifier } from "../../state/actions/notifierAction";
import Loading from "../layout/Loading";
import { NEW_NOTIFIER_RESET } from "../../state/constants/notifierConstants";
import Image from "next/image";
import { data } from "./data";
import { signOut } from "next-auth/client";
import Loader from "../layout/Loader";

const Application = () => {
	const provinces = Object.keys(data);
	const [name, setName] = useState("");

	const [city, setCity] = useState("Kigali");
	const [district, setDistrict] = useState("Kicukiro");
	const [cell, setCell] = useState("Kagunga");
	const [village, setVillage] = useState("");
	const [description, setDescription] = useState("");
	const [sector, setSector] = useState("Gikondo");
	const [category, setCategory] = useState("private");
	const [education, setEducation] = useState("Bachelors");
	const [price, setPrice] = useState("1000");

	const [districts, setDistricts] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [cells, setCells] = useState([]);
	const [villages, setVillages] = useState([]);

	useEffect(() => {
		if (Object.keys(data[city])) {
			setDistricts(Object.keys(data[city]));
		}
		if (data[city][district]) {
			setSectors(Object.keys(data[city][district]));
		}
		if (data[city][district] && data[city][district][sector]) {
			setCells(Object.keys(data[city][district][sector]));
		}
		if (data[city][district] && data[city][district][sector] && data[city][district][sector][cell]) {
			setVillages(Object.values(data[city][district][sector][cell]));
		}
	}, [cell, city, district, sector]);

	const [land, setLand] = useState(false);
	const [marriage, setMarriage] = useState(false);
	const [migration, setMigration] = useState(false);
	const [reports, setReports] = useState(false);
	const [birth, setBirth] = useState(false);
	const [images, setImages] = useState([]);
	const [profileImage, setProfileImage] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const [profilePreview, setProfilePreview] = useState();

	const dispatch = useDispatch();
	const router = useRouter();
	const { success, loading, error } = useSelector((state) => state.newNotifier);

	useEffect(() => {
		if (error) {
			console.log(error);
			toast.error(error);
			dispatch(clearErrors());
		}
		if (success) {
			toast.success("New notifier created succesfully. Relogin to see the changes");
			router.push("/login");
			signOut();

			dispatch({ type: NEW_NOTIFIER_RESET });
		}
	}, [dispatch, error, success, router]);

	const imageHandler = (e) => {
		const files = Array.from(e.target.files);
		//   setImages([]);
		//   setImagesPreview([]);
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setImages((prev) => [...prev, reader.result]);
					setImagesPreview((prev) => [...prev, reader.result]);
				}
			};
			reader.readAsDataURL(file);
		});
	};
	const profileHandler = (e) => {
		setProfileImage("");
		setProfilePreview("");
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setProfileImage(reader.result);
				setProfilePreview(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		if (!birth && !land && !migration && !reports && !marriage) {
			toast.error("Choose one category");
			return;
		}
		e.preventDefault();
		const notifierData = {
			name,
			pricePerDocument: `${price} RWF`,
			description,
			address: { city, sector, district, cell, village },
			category,
			education,
			landServices: land,
			birthCertificates: birth,
			marriage,
			migrationServices: migration,
			schoolReports: reports,
			profileImage,
			images,
		};		

		dispatch(newNotifier(notifierData));
	};

	return (
		<div className='container container-fluid'>
			<div className='row wrapper'>
				<div className='col-10 col-lg-8'>
					<form className='shadow-lg' onSubmit={handleSubmit} encType='multipart/form-data'>
						<h1 className='mb-4'>Apply as a Notifier</h1>
						<div className='form-group'>
							<label htmlFor='name_field'>Name</label>
							<input type='text' id='name_field' className='form-control' value={name} onChange={(e) => setName(e.target.value)} required />
						</div>
						<div className='form-group'>
							<label htmlFor='category_field'>Category</label>
							<select className='form-control' id='rom_type_field' value={category} onChange={(e) => setCategory(e.target.value)}>
								{["public", "private"].map((num) => (
									<option value={num} key={num}>
										{num}
									</option>
								))}
							</select>
						</div>

						<div className=' row'>
							<div className='col form-group'>
								<label htmlFor='category_field'>Province</label>
								<select className='form-control' id='guest_field' value={city} onChange={(e) => setCity(e.target.value)}>
									{provinces.map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
							</div>

							<div className='col form-group'>
								<label htmlFor='category_field'>District</label>

								<select className='form-control' id='guest_field' value={district} onChange={(e) => setDistrict(e.target.value)}>
									{districts.map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className=' row'>
							<div className='col form-group'>
								<label htmlFor='category_field'>Sector</label>

								<select className='form-control' id='guest_field' value={sector} onChange={(e) => setSector(e.target.value)}>
									{sectors?.map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
							</div>

							<div className='col form-group'>
								<label htmlFor='category_field'>Cell</label>

								<select className='form-control' id='guest_field' value={cell} onChange={(e) => setCell(e.target.value)}>
									{cells?.map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
							</div>
							<div className='col form-group'>
								<label htmlFor='category_field'>Village</label>

								<select className='form-control' id='guest_field' value={village} onChange={(e) => setVillage(e.target.value)}>
									{villages?.map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
							</div>
						</div>
						<label className='mb-3'>Documents Available</label>
						<div className='form-check'>
							<input className='form-check-input' type='checkbox' id='land_checkbox' value={land} onChange={(e) => setLand(e.target.checked)} />
							<label className='form-check-label' htmlFor='internet_checkbox'>
								Land Services
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='checkbox' id='marriage_checkbox' value={marriage} onChange={(e) => setMarriage(e.target.checked)} />
							<label className='form-check-label' htmlFor='breakfast_checkbox'>
								Marriage
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='checkbox' id='birth_checkbox' value={birth} onChange={(e) => setBirth(e.target.checked)} />
							<label className='form-check-label' htmlFor='birth_checkbox'>
								Birth Certificates
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='checkbox' id='migration_checkbox' value={migration} onChange={(e) => setMigration(e.target.checked)} />
							<label className='form-check-label' htmlFor='migration_checkbox'>
								Migration Services
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='checkbox' id='reports_checkbox' value={reports} onChange={(e) => setReports(e.target.checked)} />
							<label className='form-check-label' htmlFor='reports_checkbox'>
								School Reports
							</label>
						</div>
						<div className='form-group'>
							<label htmlFor='price_field'>Average price per document (RWF)</label>
							<input type='text' id='price_field' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} required />
						</div>
						<div className='form-group mt-4'>
							<div className='form-group'>
								<label htmlFor='category_field'>Choose your education</label>
								<select className='form-control' id='education_field' required value={education} onChange={(e) => setEducation(e.target.value)}>
									{["Bachelors", "Masters", "PHD"].map((num) => (
										<option value={num} key={num}>
											{num}
										</option>
									))}
								</select>
								{/* <select className="form-control" id="education_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
							</div>
							<label>Images of education certificates</label>
							<div className='custom-file'>
								<input type='file' name='notifier_images' required className='custom-file-input' id='customFile' onChange={imageHandler} multiple />
								<label className='custom-file-label' htmlFor='customFile'>
									Choose Images
								</label>
							</div>

							{imagesPreview.map((img) => (
								<Image key={img} src={img ?? ""} alt={img} className='mt-3 mr-2' width={55} height={52} />
							))}
						</div>
						<label>Profile Image</label>
						<div className='custom-file'>
							<input type='file' name='notifier_images' className='custom-file-input' required id='customFile' onChange={profileHandler} />
							<label className='custom-file-label' htmlFor='customFile'>
								Choose Images
							</label>
						</div>
						{profilePreview && <Image key={profilePreview} src={profilePreview ?? ""} alt={profilePreview} className='mt-3 mr-2' width={55} height={52} />}

						<div className='form-group'>
							<label htmlFor='description_field'>Enter more about your notary office</label>
							<textarea className='form-control' id='description_field' rows='8' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
						</div>
						<button type='submit' className='btn btn-block bg-choco text-white new-notifier-btn py-3' disabled={loading ? true : false}>
							{loading ? <Loader /> : "Appy"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Application;
