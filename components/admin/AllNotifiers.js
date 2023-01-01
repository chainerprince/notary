import { MDBDataTableV5 } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { MDBDataTable } from "mdbreact";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { clearErrors } from "../../state/actions/appointmentAction";
import { getAdminNotifiers, deleteNotifier } from "../../state/actions/notifierAction";
import Loader from "../layout/Loader";
import { DELETE_NOTIFIER_RESET } from "../../state/constants/notifierConstants";

const AllNotifiers = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { notifiers, loading, error } = useSelector((state) => state.allNotifiers);
	const { isDeleted, error: deleteError, success } = useSelector((state) => state.deleteNotifier);
	const { isUpdated } = useSelector((state) => state.updateNotifier);
	if (isUpdated) {
		router.reload();
	}

	useEffect(() => {
		dispatch(getAdminNotifiers());
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success("Notifier canceled successfully");
			router.push("/admin/notifiers");
			dispatch({ type: DELETE_NOTIFIER_RESET });
		}
	}, [dispatch, isDeleted, deleteError, error, router]);

	const deleteHandler = (id) => {
		console.log(id);
		dispatch(deleteNotifier(id));
	};
	const setNotifiers = () => {
		const data = {
			columns: [
				{
					label: "Notifier Id",
					field: "id",
					sort: "asc",
				},
				{
					label: "Name",
					field: "name",
					sort: "asc",
				},
				{
					label: "Price/Document",
					field: "price",
					sort: "asc",
				},
				{
					label: "Location",
					field: "location",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},

				{
					label: "Actions",
					field: "action",
					sort: "asc",
				},
			],
			rows: [],
		};

		notifiers &&
			notifiers.forEach((notifier) => {
				data.rows.push({
					id: notifier._id,
					name: (
						<div>
							{" "}
							<span className='d-none d-md-block '>{notifier.name}</span> <span className='d-sm-block d-md-none '>{notifier.name.slice(0, 8) + "..."}</span>{" "}
						</div>
					),

					price: `${notifier.pricePerDocument} RWF`,
					location: `${notifier.address?.sector}`,
					status: (
						<div className='d-flex justify-content-center align-items-center '>
							{notifier.status !== "true" ? (
								<Link href={`/admin/notifiers/${notifier._id}?approve=true`}>
									<a className='btn btn-success'>
										<i className='fa fa-check'></i>
									</a>
								</Link>
							) : (
								"approved"
							)}
						</div>
					),
					action: (
						<div className='d-flex'>
							<button className='btn-danger btn mx-2' onClick={() => deleteHandler(notifier._id)}>
								<i className='fa fa-trash'></i>
							</button>
						</div>
					),
				});
			});

		return data;
	};

	return (
		<div className='container container-fluid'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className='my-4'>{`${notifiers && notifiers.length} Notifiers`}</h1>

					{/* <Link href="/application">
                <a className="mt-0 btn text-white btn-sm float-right bg-choco mt-3">Add Notifier</a>
            </Link> */}
				</>
			)}

			<MDBDataTable data={setNotifiers()} className='px-3' bordered striped hover responsive autoWidth small />
		</div>
	);
};

export default AllNotifiers;
