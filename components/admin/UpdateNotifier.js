import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { clearErrors, getNotifierDetails, updateNotifier } from "../../state/actions/notifierAction";
import Loading from "../layout/Loading";
import { NEW_NOTIFIER_RESET } from "../../state/constants/notifierConstants";
import Loader from "../layout/Loader";
import Image from "next/image";

const UpdateNotifier = () => {
	const [name, setName] = useState("");
	const [district, setDistrict] = useState("kicukiro");
	const [address, setAddress] = useState({});
	const [description, setDescription] = useState("");
	const [sector, setSector] = useState("");
	const [category, setCategory] = useState("private");
	const [education, setEducation] = useState("");
	const [price, setPrice] = useState("1000");

	const [land, setLand] = useState(false);
	const [marriage, setMarriage] = useState(false);
	const [migration, setMigration] = useState(false);
	const [reports, setReports] = useState(false);
	const [birth, setBirth] = useState(false);
	const [images, setImages] = useState([]);
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const dispatch = useDispatch();
	const router = useRouter();
	const { isUpdated, loading, error } = useSelector((state) => state.updateNotifier);
	const { notifier, loading: detailsLoading, error: detailsError } = useSelector((state) => state.notifierDetails);

	const { id, approve } = router.query;

	useEffect(() => {
		if (Object.keys(notifier).length < 1 && notifier?._id !== id) {
			console.log("reached here");
			dispatch(getNotifierDetails("", id));
		} else {
			if (notifier) {
				setName(notifier?.name);
				setDescription(notifier?.description);
				setPrice(notifier?.pricePerDocument);
				setAddress({ sector, district });
				setSector(notifier?.address?.sector);
				setDistrict(notifier?.address?.district);
				setCategory(notifier?.category);
				setEducation(notifier?.education);
				setBirth(notifier.birthCertificates);
				setMarriage(notifier.marriage);
				setMigration(notifier.migrationServices);
				setReports(notifier.schoolReports);
				setOldImages(notifier.images);
			}
		}

		if (error) {
			console.log(error);
			toast.error(error);
			dispatch(clearErrors());
		}

		if (detailsError) {
			toast.error(detailsError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			dispatch({ type: NEW_NOTIFIER_RESET });
			router.push("/admin/notifiers");
		}
	}, [dispatch, error, isUpdated, notifier, detailsError, id, router, sector, district]);

	const redirectToImage = (image) => {
		router.push(image);
	};

	const imageHandler = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setOldImages([]);
		setImagesPreview([]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		const notifierData = {
			name,
			pricePerDocument: `${price}`,
			description,
			address: { sector, district },
			category,
			education,
			landServices: land,
			birthCertificates: birth,
			marriage,
			migrationSersvices: migration,
			schoolReports: reports,
			status: approve ? true : false,
			images,
		};

		if (images.length !== 0) notifierData.images = images;
		dispatch(updateNotifier(notifier._id, notifierData));
		dispatch(clearErrors());
	};

	return (
		<>
			{detailsLoading ? (
				<Loader />
			) : (
				<div className='container container-fluid'>
					<div className='row wrapper'>
						<div className='col-10 col-lg-8'>
							<form className='shadow-lg' onSubmit={handleSubmit} encType='multipart/form-data'>
								<h1 className='mb-4'> {approve ? "Approve notifier" : "Update Notifier"}</h1>
								<div className='form-group'>
									<label htmlFor='name_field'>Name</label>
									<input type='text' disabled={approve ? true : false} id='name_field' className='form-control' value={name} onChange={(e) => setName(e.target.value)} required />
								</div>
								<div className='form-group'>
									<label htmlFor='category_field'>Category</label>
									<select className='form-control' id='rom_type_field' value={category} onChange={(e) => setCategory(e.target.value)} disabled={approve ? true : false}>
										{["public", "private"].map((num) => (
											<option value={num} key={num}>
												{num}
											</option>
										))}
									</select>
								</div>

								<div className='form-group'>
									<label htmlFor='category_field'>District</label>

									<select className='form-control' id='guest_field' value={district} onChange={(e) => setDistrict(e.target.value)} disabled={approve ? true : false}>
										{["Gasabo", "Kicukiro", "Nyarugenge"].map((num) => (
											<option value={num} key={num}>
												{num}
											</option>
										))}
									</select>
									{/* <select className="form-control" id="numOfBeds_field" value="">
                       <option value="">1</option>
                       <option value="">2</option>
                    </select> */}
								</div>
								<div className='form-group'>
									<label htmlFor='sector_field'>Sector</label>
									<input type='text' disabled id='sector_field' className='form-control' value={sector} onChange={(e) => setSector(e.target.value)} required />
								</div>
								<label className='mb-3'>Documents Available</label>
								<div className='form-check'>
									<input className='form-check-input' disabled={approve ? true : false} type='checkbox' id='land_checkbox' value={land} checked={land} onChange={(e) => setLand(e.target.checked)} />
									<label className='form-check-label' htmlFor='internet_checkbox'>
										Land Services
									</label>
								</div>
								<div className='form-check'>
									<input className='form-check-input' disabled type='checkbox' id='marriage_checkbox' value={marriage} checked={marriage} onChange={(e) => setMarriage(e.target.checked)} />
									<label className='form-check-label' htmlFor='marriage_checkbox'>
										Marriage
									</label>
								</div>
								<div className='form-check'>
									<input className='form-check-input' disabled type='checkbox' id='birth_checkbox' value={birth} checked={birth} onChange={(e) => setBirth(e.target.checked)} />
									<label className='form-check-label' htmlFor='birth_checkbox'>
										Birth Certificates
									</label>
								</div>
								<div className='form-check'>
									<input className='form-check-input' disabled type='checkbox' id='migration_checkbox' value={migration} onChange={(e) => setMigration(e.target.checked)} />
									<label className='form-check-label' htmlFor='migration_checkbox'>
										Migration Services
									</label>
								</div>
								<div className='form-check'>
									<input className='form-check-input' disabled type='checkbox' id='reports_checkbox' value={reports} checked={reports} onChange={(e) => setReports(e.target.checked)} />
									<label className='form-check-label' htmlFor='reports_checkbox'>
										School Reports
									</label>
								</div>
								<div className='form-group'>
									<label htmlFor='price_field'>Average price per document (RWF)</label>
									<input type='text' disabled id='price_field' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} required />
								</div>
								<div className='form-group mt-4'>
									<div className='form-group'>
										<label htmlFor='category_field'>Choose your education</label>
										<select className='form-control' id='education_field' value={education} onChange={(e) => setEducation(e.target.value)} disabled={approve ? true : false}>
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
									<div>
										{console.log(oldImages)}
										{oldImages?.length > 0 ? (
											oldImages?.map((img) => (
												<a target='_blank' href={img?.url} key={img?._id} rel='noopener noreferrer'>
													<Image src={img?.url} alt={"User Images"} className='mt-3 mr-2 cursor-pointer' width={150} height={150} onClick={() => redirectToImage(img?.url)} />
												</a>
											))
										) : (
											<div>No Images Available</div>
										)}
									</div>
								</div>
								<div className='form-group'>
									<label htmlFor='description_field'>Enter more about your notary office</label>
									<textarea className='form-control' id='description_field' rows='8' value={description} disabled={approve ? true : false} onChange={(e) => setDescription(e.target.value)} required></textarea>
								</div>
								<button type='submit' className='btn btn-block new-notifier-btn py-3' disabled={loading ? true : false}>
									{loading ? <Loader /> : approve ? "Approve" : "Update"}
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UpdateNotifier;
