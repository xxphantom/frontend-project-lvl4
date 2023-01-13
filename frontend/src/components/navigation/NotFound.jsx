import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { useTranslation, Trans } from 'react-i18next';
import notFound from '../../assets/notFound.png';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image alt="Страница не найдена" fluid src={notFound} />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        <Trans i18nKey="notFound.goToHome">
          {'But you can go to the '}
          <Link to="/">main page</Link>
        </Trans>
      </p>
    </div>
  );
};

export default NotFound;
