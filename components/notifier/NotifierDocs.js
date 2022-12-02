import React from 'react'

const NotifierDocs = ({notifier}) => {
    return (
        <div className="features mt-5">
        <h3 className='mb-4'>Documents Available:</h3>
                  
          <div className='notifier-doc'>
            <i className={notifier.marriage ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Marriage</p>
          </div>
          <div className='notifier-doc'>
            <i className={notifier.schoolReports ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>School Reports</p>
          </div>
          <div className='notifier-doc'>
            <i className={notifier.landSErvices ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Land Services</p>
          </div>
          <div className='notifier-doc'>
            <i className={notifier.birthCertificates ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Birth Certificates</p>
          </div>
          <div className='notifier-doc'>
            <i className={notifier.migrationServices ? "fa  fa-fw fa-check text-success" : "fa  fa-fw fa-times text-danger"} aria-hidden="true"></i>
            <p>Migration Services</p>
          </div>

          

      </div>
    )
}

export default NotifierDocs
