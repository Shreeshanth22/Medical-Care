import React from "react";

const Biography = ({ imageUrl }) => {
    return (
        <>
            <div className="container biography">
                <div className="banner">
                    <img src={imageUrl} alt="whoweare" />
                </div>
                <div className="banner">
                    <p>Biography</p>
                    <h3>Who We Are</h3>
                    <p>
                        MediCare Institute is a modern healthcare facility committed to offering a full range
                        of medical services with compassion and expertise. Our dedicated team works hard to
                        provide personalized care to meet each patient's unique needs. At MediCare, your
                        well-being is our priority, and we strive to ensure a smooth and supportive journey
                        toward better health and wellness.
                    </p>

                    <p>We are now in the year 2025!</p>

                    <p>We are currently developing a MERN Stack project.</p>

                    <p>
                        MediCare offers advanced treatments and professional medical care. Our team ensures
                        that every patient receives the right attention and guidance for their health. We
                        value trust, quality service, and patient satisfaction, making sure that every step
                        of your treatment is handled with care. Your health is our mission.
                    </p>

                    <p>Good health is our goal!</p>

                    <p>Coding makes the process even more exciting!</p>

                </div>
            </div>
        </>
    );
};

export default Biography;
