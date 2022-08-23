import React from 'react'

const RoomFeatures = ({room}) => {
    return (
        <div className="features mt-5">
        <h3 className='mb-4'>Documents Available:</h3>
                  
          <div className='room-feature'>
            <i className={room.schoolReports ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Marriage</p>
          </div>
          <div className='room-feature'>
            <i className={room.schoolReports ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>School Reports</p>
          </div>
          <div className='room-feature'>
            <i className={room.landSErvices ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Land Services</p>
          </div>
          <div className='room-feature'>
            <i className={room.birthCertificates ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Birth Certificates</p>
          </div>
          <div className='room-feature'>
            <i className={room.migrationServices ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Migration Services</p>
          </div>

          

      </div>
    )
}

export default RoomFeatures
